import { useEffect, useState } from 'react';
import { insert, read, update, remove } from '../services/apiService';



const Student = ({match, history}) => {
    
  const [id] = useState(match.params.id)  
  const [student, setStudent] = useState({
    _id: '0',
    firstName: '',
    lastName: '',
    yearOfBirth: '',
    address: ''
  });  

  useEffect(() => {
    if(id !== '0'){
        read('students', id, data => {
            if(data) setStudent(data);
        })
    }
  }, [id]);

function changeHandler(e) {
    setStudent({
         ...student,
    [e.target.name]: e.target.value
    });
}

const back = () => {
    history.push('/students');

}

const save = () => {
    if (student.firstName === '' || student.firstName === '') {     
        alert('Some of required fields are empty!');     
        return;   
    }    
    if (student.lastName === '' || student.lastName === '') {     
        alert('Some of required fields are empty!');     
        return;   
    }   


    if (id === '0') {
        student._id = undefined;
        insert('students', student, data => {
            if(data) return history.push('/students');
            console.log('There was error during save data!!!');
        });
    } else {
        update('students', id, student, data => {
            if (data) return history.push('/students');
            console.log('There was error during save data!!!');
        });
    }
}


const del = () => {
    remove('students', id, data => {
        history.push('/students');
    })

}


const firstNameEmpty = student.firstName === null || student.firstName === ''; 
const lastNameEmpty = student.lastName === null || student.lastName === ''; 

    return (
    <div className='container'>
        <h2>Student</h2>
        <form className='input-form'>
            <div style={{margin:'12px 0'}}>
            {firstNameEmpty && <div>This field is required!</div>} 
                <label htmlFor='firstName'>First name:</label>
                <input type='text' 
                name='firstName' 
                value={student.firstName}
                onChange={changeHandler} 
                placeholder='Enter your first name!' 
                required
                />

            </div>

            <div style={{margin:'12px 0'}}>
            {lastNameEmpty && <div>This field is required!</div>} 
                <label htmlFor='lastName'>Last name:</label>
                <input type='text' 
                name='lastName' 
                value={student.lastName}
                onChange={changeHandler} 
                placeholder='Enter your last name!'
                required
                />
            </div>

            <div style={{margin:'12px 0'}}>
                <label htmlFor='yearOfBirth'>Year of birth:</label>
                <input type='number' 
                name='yearOfBirth' 
                value={student.yearOfBirth}
                placeholder='You can enter only the number!'
                onChange={changeHandler} />
            </div>

            <div style={{margin:'12px 0'}}>
                <label htmlFor='address'>Address:</label>
                <input type='text' 
                name='address' 
                value={student.address}
                onChange={changeHandler} />
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

export default Student;