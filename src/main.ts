import { ProjectList } from './DOM-selectors';
import { getMyRepos } from './Github-Api'
import './style.css'
import { UserRepos } from './types'


window.addEventListener("load",async() => {
    let myRepos;

    try {
        myRepos = await getMyRepos()
        console.log(myRepos);
    } catch (error) {
        console.log(error);
    }

    if (!myRepos) {
        return;
    }

    const myPortfolioRepos = myRepos.filter(repo => {
        if (repo.topics[0] === "portfolio") {
            return true
        }

    })
    console.log(myPortfolioRepos);
    renderRepos(myPortfolioRepos)

})

const renderRepos = (repos:UserRepos) => {
    if (!repos.length) {
        return ProjectList.innerHTML = "<h3>No projects found!</h3>"
    }

    return repos.map(repo => {
        ProjectList.innerHTML += 
        `          
        <div>
            <img
            src="./public/project1.png"
            loading="lazy"
            alt="${repo.name}"
            class="project-img"
            />
            <div class="project-nonimg">
                <h3 class="project-titel">${repo.name}</h3>
                <ul class="project-tools-list">
                    <li class="tool">HTML</li>
                    <li class="tool">CSS</li>
                    <li class="tool">Bootstrap</li>
                    <li class="tool">React</li>
                    <li class="tool">SQL</li> 

                </ul>
                <p class="project-p">
                ${repo.description}
                </p>
                <ul id="project-button-group">
                    <li class="project-buttons">
                        <a href="${repo.homepage}" class="button-link">Live Test</a>
                    </li>
                    <li class="project-buttons">
                        <a href="${repo.svn_url}" class="button-link">Check code</a>
                    </li>
                </ul>
            </div>
        </div>
      `
    })
}








// // Get the audio
// var audio = document.getElementById("bg-audio");

// // Get the button
// var btn = document.getElementById("myBtn");

// // Pause and play the audio, and change the button text
// function myFunction() {
//   if (audio.paused) {
//     audio.play();
//     btn.innerHTML = "Pause";
//   } else {
//     audio.pause();
//     btn.innerHTML = "Play";
//   }
// }
