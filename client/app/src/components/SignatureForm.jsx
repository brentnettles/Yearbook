import React, { useState } from 'react';
import { useUser } from '../CreateUserContext'; // Import the useUser hook

function SignatureForm({ studentId, onNewSignature }) {
  const [signature, setSignature] = useState('');
  const { user } = useUser(); // Access the current user

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authorId = user ? user.user_id : null;

    try {
      const response = await fetch('http://127.0.0.1:5555/api/signatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: signature, studentId, authorId }),
      });

      if (response.ok) {
        const newSignature = await response.json(); // Assuming the server returns the saved signature
        console.log('Signature submitted successfully');
        onNewSignature(newSignature);
        setSignature('');
      } else {
        console.error('Failed to submit signature');
      }
    } catch (error) {
      console.error('Error submitting signature:', error);
    }
  };

  return (
    <div>
      <h2>Oh the memories...</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Signature:
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignatureForm;