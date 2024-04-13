import React, { useState } from 'react';

function SignatureForm() {
  // State to store the signature input value
  const [signature, setSignature] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send the signature data to your backend API
      const response = await fetch('http://your-backend-api/signatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: signature }),
      });

      if (response.ok) {
        // Handle success
        console.log('Signature submitted successfully');
      } else {
        // Handle error
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
