async function userLoader({ request, params }) {
    const res = await fetch('http://127.0.0.1:5555/check_session', {
        method: 'GET',
        credentials: 'include'
      })
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          return {}
        }
      })
    return res
  }
  
  async function cohortLoader({ request, params }) { 
    const res = await fetch('http://127.0.0.1:5555/api/cohorts', {
        method: 'GET',
        credentials: 'include'
      })
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          return []
        }
      })
    return res
  }
  
  async function yearbookLoader({ params }) {
    const res = await fetch(`http://127.0.0.1:5555/api/yearbook/${params.cohortId}`, {
        method: 'GET',
        credentials: 'include'
      })
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          return []
        }
      })
    return res
  }
  
  async function studentDetailsLoader({ request, params }) {
    const res = await fetch(`http://127.0.0.1:5555/api/student/${params.studentId}`, {  // corrected from params.student_id to params.studentId
        method: 'GET',
        credentials: 'include'
      })
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          return {};
        }
      });
    return res;
  }
  
  
    async function createSignatureLoader({ request, params }) {
    const res = await fetch('http://127.0.0.1:5555/signatures', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: params.message
          // Add other required fields here
        })
      })
      .then(resp => {
        if (resp.ok) {
          return resp.json()
        } else {
          throw new Error('Failed to create signature')
        }
      })
    return res
  }
  
    export {
        userLoader,
        cohortLoader,
        yearbookLoader,
        studentDetailsLoader,
        createSignatureLoader
     };