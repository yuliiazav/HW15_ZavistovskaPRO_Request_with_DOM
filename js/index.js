function getData(url, {method = 'GET', body = null, headers = {}} = {}) {
    return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();

        request.open(method, url);
        Object.entries(headers).forEach(([headerName, headerValue]) => {
            request.setRequestHeader(headerName, headerValue);

        });
        request.send(body);

        request.onload = () => {
            resolve(request.response);
        };
        request.onerror = () => {
            reject();
        }
    });
}

const myWorkersList = document.querySelector('.mylist');

function renderWorkersList({name, photo, position}) {
    const listElement = document.createElement('li');
    listElement.innerHTML = `
    <h1>${name}</h1>
    <p>(${position})</p>
    <p><a href="${photo}"> ${name} - photo</a></p>
    `;
    myWorkersList.append(listElement);
}


document.addEventListener('DOMContentLoaded', () => {
    getData('https://users-api-id.herokuapp.com/users')
        .then((data) => {
            const workers = JSON.parse(data);

            workers.forEach(renderWorkersList);
        })
        .catch(() => {
            console.log(err);
        });
});

