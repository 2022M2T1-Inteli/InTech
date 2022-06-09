let softSkillsTags = []; 
let softSkillsContainer = document.querySelector('.softSkillsContainer');
let softSkillsInput = softSkillsContainer.querySelector('input');

softSkillsInput.addEventListener('keyup', addSoftSkillsTags); 

function addSoftSkillsTags(event) {
    const keyPressedIsEnter = event.key == 'Enter';

    if (keyPressedIsEnter) {
        softSkillsInput.value.split(',').forEach( tag => {
            if (tag) {
                softSkillsTags.push(tag.trim());
            }
        });

        updateSoftSkillsTags();
        softSkillsInput.value = "";
    }   
}
 
function updateSoftSkillsTags() {
    clearSoftSkillsTags();

    softSkillsTags.slice().reverse().forEach(tag => {
        softSkillsContainer.append(createSoftSkillsTags(tag)); 
    });
}

function createSoftSkillsTags(tag) {
    const softSkillDiv = document.createElement('div');
    softSkillDiv.classList.add('softSkillTag');

    const softSkillSpan = document.createElement('span');
    softSkillSpan.innerHTML = tag
    softSkillSpan.setAttribute("id","softskills")

    softSkillDiv.append(softSkillSpan);

    const softSkillElementI = document.createElement('i');
    softSkillElementI.classList.add('closeSoftSkill');
    softSkillElementI.setAttribute('data-id', tag);
    softSkillElementI.onclick = removeSoftSkillTag;
    softSkillSpan.append(softSkillElementI)

    return softSkillDiv;
}

function removeSoftSkillTag(event) {
   const softSkillDeleteBtn = event.currentTarget;
    const dataItemId = softSkillDeleteBtn.dataset.id;

    const index = softSkillsTags.indexOf(dataItemId);

    softSkillsTags.splice(index, 1);


    updateSoftSkillsTags(); 
} 


function clearSoftSkillsTags() {
    softSkillsContainer.querySelectorAll('.softSkillTag').forEach(tagElement => tagElement.remove());
} 