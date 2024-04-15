const { tap, switchMap } = rxjs.operators;
const { interval, from } = rxjs;
const RxHR = rhr.RxHR;


const intervalInput = document.getElementById('tempo');
const toggleButton = document.getElementById('toggle-button');
const sharedFolderContents = document.getElementById('shared-folder-contents');
const URL = 'http://localhost:8080/xfx';

let updatesEnabled = false;
let intervalSubscription = null;


function fetchSharedFolderContents() {
    return RxHR.get(`${URL}/getfiles`, {
        json: true,
        qs: {
            path: 'SharedFolder/', // Parameter appended to URL
        },
    }).pipe(
        tap(({ response }) => {
            if (response.statusCode !== 200) {
                throw new Error(`Error fetching shared folder contents: ${response.statusCode}`);
            }
        })
    );
}

function displaySharedFolderContent(contents) {
    //Formatting response received from server
    const jsonContent = contents.replace(/=/g, '":"').replace(/,/g, '","').replace(/{/g, '{"').replace(/}/g, '"}');
    const data = JSON.parse(jsonContent);
    sharedFolderContents.innerHTML = '';

    for (const [name, size] of Object.entries(data)) {
        const listItem = document.createElement('div');
        listItem.className = 'file-item';
        listItem.innerHTML = `
            <i class="fas fa-file"></i>
            <span class="file-name">${name}</span>
            <span class="file-size">(${size} bytes)</span>
        `;
        sharedFolderContents.appendChild(listItem);
    }
}

window.toggleUpdates = function () {
    var button = document.getElementById('toggle-button');
    updatesEnabled = !updatesEnabled;
    toggleButton.textContent = updatesEnabled ? 'Stop' : 'Start';

    if (updatesEnabled) {
        button.classList.add('button-red');
        const updateInterval = parseInt(intervalInput.value, 10) * 1000;

        intervalSubscription = interval(updateInterval).pipe(
            tap(() => console.log('Fetching updates')),
            switchMap(() => from(fetchSharedFolderContents())),
            tap(({ response }) => displaySharedFolderContent(response.body))
        ).subscribe();
    } else {
        button.classList.remove('button-red');
        intervalSubscription.unsubscribe();
    }
};
