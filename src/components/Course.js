import { useEffect, useState } from 'react';
import { insert, read, update, remove } from '../services/apiService';



const Course = ({match, history}) => {
    
  const [id] = useState(match.params.id)  
  const [course, setCourse] = useState({
    _id: '0',
    name: '',
    points: 0
  });  

  useEffect(() => {
    if(id !== '0'){
        read('courses', id, data => {
            if(data) setCourse(data);
        })
    }
  }, [id]);

function changeHandler(e) {
    setCourse({
         ...course,
    [e.target.name]: e.target.value
    });
}

const back = () => {
    history.push('/courses');

}

const save = () => {
    if (course.name === '' || course.name === '') {     
        alert('Some of required fields are empty!');     
        return;   
    }    
    if (course.points === '' || course.points === '') {     
        alert('Some of required fields are empty!');     
        return;   
    }    
    
    if (id === '0') {
        course._id = undefined;
        insert('courses', course, data => {
            if(data) return history.push('/courses');
            console.log('There was error during save data!!!');
        });
    } else {
        update('courses', id, course, data => {
            if (data) return history.push('/courses');
            console.log('There was error during save data!!!');
        });
    }
}


const del = () => {
    remove('courses', id, data => {
        history.push('/courses');
    })

}

const coursenameEmpty = course.name === null || course.name === ''; 
const coursepointsEmpty = course.points === null || course.points === ''; 

    return (
    <div className='container'>
        <h2>Course</h2>
        <form className='input-form'>
            <div style={{margin:'12px 0'}}>
            { coursenameEmpty && <div> This field is required! </div>}
                <label htmlFor='name'>Course name:</label>
                <input type='text' 
                    name='name' 
                    value={course.name}
                    onChange={changeHandler}
                    required
                />
                        </div>
            <div style={{margin:'12px 0'}}>
            { coursepointsEmpty && <div>This field is required, you can enter only the number!</div>}
                <label htmlFor='points'>Course points: </label>
                <input type='number' 
                    name='points' 
                    value={course.points}
                    onChange={changeHandler} 
                    required

                />
            </div>
            <hr />
            {id !=='0' && (
            <div className='left'>
                <button type='button' onClick={del}>DELETE</button>
            </div>
            )}
            <div className='right'>
                <button type='button' onClick={back}>BACK</button>
                 &nbsp;&nbsp; 
                <button type='button' onClick={save}>SAVE</button>
            </div>


        </form>
    </div>
    );
}

export default Course;