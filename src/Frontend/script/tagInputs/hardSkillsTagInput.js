let hardSkillsTags = []; 
let hardSkillsContainer = document.querySelector('.hardSkillsContainer');
let hardSkillsInput = hardSkillsContainer.querySelector('input');

hardSkillsInput.addEventListener('keyup', addHardSkillsTag); 

function addHardSkillsTag(event) {
    const keyPressedIsEnter = event.key == 'Enter';

    if (keyPressedIsEnter) {
        hardSkillsInput.value.split(',').forEach( tag => {
            if (tag) {
                hardSkillsTags.push(tag.trim());
            }
        });

        updateHardSkillsTags();
        hardSkillsInput.value = "";
    }   
}
 
function updateHardSkillsTags() {
    clearHardSkillsTag();

    hardSkillsTags.slice().reverse().forEach(tag => {
        hardSkillsContainer.append(createHardSkillsTag(tag)); 
    });
}

function createHardSkillsTag(tag) {
    const hardSkillDiv = document.createElement('div');
    hardSkillDiv.classList.add('hardSkillTag');

    const hardSkillSpan = document.createElement('span');
    hardSkillSpan.innerHTML = tag

    hardSkillDiv.append(hardSkillSpan);

    const hardSkillsElementI = document.createElement('i');
    hardSkillsElementI.classList.add('closeHardSkill');
    hardSkillsElementI.setAttribute('data-id', tag);
    hardSkillsElementI.onclick = removeHardSkillTag;
    hardSkillSpan.append(hardSkillsElementI)

    return hardSkillDiv;
}

function removeHardSkillTag(event) {
   const hardSkillDeleteBtn = event.currentTarget;
    const dataItemId = hardSkillDeleteBtn.dataset.id;

    const index = hardSkillsTags.indexOf(dataItemId);

    hardSkillsTags.splice(index, 1);


    updateHardSkillsTags(); 
} 


function clearHardSkillsTag() {
    hardSkillsContainer.querySelectorAll('.hardSkillTag').forEach(tagElement => tagElement.remove());
} 