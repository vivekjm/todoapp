function postValue() {
    let content = document.getElementById('textbox').value;
    let sendData;
    sendData = {
        name: content
    }
    fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)
        })
        .then(res => {
            getPosts();
        })
}

function getPosts() {
    fetch('http://localhost:3000/')
        .then((res) => res.json())
        .then((data) => {
            let output = '<h6></h6>'
            data.forEach(function(todo) {
                output += `
                <div>
                    <ul>                       
                        <li style="width:20em;height:3em"> <input type="text" id="${todo.id}" value="${todo.name}" >
                            <button onclick="deletePost(${todo.id})">Delete</button>
                            <button onclick="save(${todo.id},document.getElementById('${todo.id}').value)">Save</button> </li>                       
                    </ul>
                </div>
            `;
            });
            document.getElementById('output').innerHTML = output
                // console.log(todo.id)
        })
}
getPosts();


function deletePost(id) {
    // console.log(id)
    fetch('http://localhost:3000/' + id, {
            method: 'DELETE',
        })
        .then(res => {
            getPosts();
        })
}

function save(id, name) {
    // console.log(id)
    let content = name;
    let sendData;
    sendData = {
        name: content
    };
    //  console.log(content);
    fetch('http://localhost:3000/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendData),
        })
        .then(res => {
            getPosts();
        })
}


window.onload = () => {
    getPosts();
}