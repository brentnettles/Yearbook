import React, { useState } from 'react';
import { useUserContext } from './CreateUserContext';

function SignatureForm({ studentId, onNewSignature }) {
    const [signature, setSignature] = useState('');
    const { user } = useUserContext();  

    const handleSubmit = async (event) => {
        event.preventDefault();
        const authorId = user ? user.id : null; 
    
        try {
            const response = await fetch('http://127.0.0.1:5555/api/signatures', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: signature,
                    student_id: studentId,  
                    author_id: authorId      
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
