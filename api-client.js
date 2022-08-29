const url = `http://localhost:3000`;

export const getTodoList = async () => {
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
       "Content-Type": "application/json" 
      }
    });
    const data = await res.json()
    if(res.status === 200) return { data, res }
  } catch (err) {
    console.log(err)
  }
}

export const addTodoTask = async (body = {}) => {
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-type": "application/json"
      },
    })
    const data = await res.json();
    if (res.status === 201) 
    return { data, res }
  } catch (err) {
    console.log(err)
  }
}

export const updateTodoTask = async (id, body) => {
  const urlID = url +`/${id}`
  try {
    const res = await fetch(urlID, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
       "Content-Type": "application/json" 
      }
    });
    const data = await res.json()
    if(res.status === 200) return { data, res}
  } catch (err) {
    console.log(err)
  }
}

export const deleteTodoTask = async (todoID) => {
  const newURL = url + `/${todoID}`
  try {
    const res = await fetch(newURL, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json"
      }
    })
  } catch (err) {
    console.log(err)
  }
}