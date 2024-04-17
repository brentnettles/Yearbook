import React, { useState } from 'react';
import { useUserContext } from './CreateUserContext';

function SignatureForm({ studentId, onNewSignature }) {
    const [signature, setSignature] = useState('');
    const { user } = useUserContext();  // Accessing user context

    const handleSubmit = async (event) => {
        event.preventDefault();
        const authorId = user ? user.id : null; // Assuming user.id is the logged-in student's ID
    
        try {
            const response = await fetch('http://127.0.0.1:5555/api/signatures', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: signature,
                    student_id: studentId,  // ID of the student whose details page this is
                    author_id: authorId      // ID of the logged-in student (author)
                }),
            });
    
            if (response.ok) {
                const newSignature = await response.json();
                onNewSignature(newSignature);  // Update the state to render the new signature
                setSignature('');
            } else {
                console.error('Failed to submit signature');
            }
        } catch (error) {
            console.error('Error submitting signature:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Add a signature"
            />
            <button type="submit">Sign</button>
        </form>
    );
}

export default SignatureForm;
