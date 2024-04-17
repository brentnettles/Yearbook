import React, { useState } from 'react';
import { useUserContext } from './CreateUserContext';

function SignatureForm({ studentId, onNewSignature }) {
    const [signature, setSignature] = useState('');
    const { user } = useUserContext();  // Accessing user context

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            console.error('No user logged in');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5555/api/signatures', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: signature,
                    student_id: studentId,
                    author_id: user.id  // Use user.id from the context
                }),
            });

            if (response.ok) {
                const newSignature = await response.json();
                console.log('Signature submitted successfully:', newSignature);
                onNewSignature(newSignature);
                setSignature('');
            } else {
                const errorData = await response.json();
                console.error('Failed to submit signature:', errorData.error);
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
