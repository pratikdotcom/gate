// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubjectCard from './SubjectCard'; // Import the new SubjectCard component
import './App.css'; // Import the main CSS file

function App() {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/subjects')
      .then(response => {
        console.log('Subjects fetched:', response.data); // Log the data
        setSubjects(response.data);
      })
      .catch(error => {
        console.error('Error fetching subjects:', error);
        setError('Failed to fetch subjects');
      });
  }, []);

  const handleUpdateSubject = (name, questionsSolved) => {
    axios.put(`http://localhost:5000/subjects/${name}`, { questionsSolved })
      .then(response => {
        setSubjects(subjects.map(subject =>
          subject.name === name ? response.data : subject
        ));
      })
      .catch(error => console.error('Error updating subject:', error));
  };

  return (
    <div className="container">
      <h1>Pratik's GATE Question Tracker</h1>
      {error && <p>{error}</p>}
      <div className="subject-list">
        {subjects.length > 0 ? (
          subjects.map(subject => (
            <SubjectCard
              key={subject.name}
              subject={subject}
              onUpdate={handleUpdateSubject}
            />
          ))
        ) : (
          <p>No subjects found</p>
        )}
      </div>
    </div>
  );
}

export default App;
