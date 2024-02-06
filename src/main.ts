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
        <div class="card text-bg-info mb-2 col-12 col-md-5 col-lg-4 shadow-lg " style="width: 18rem;">
            <img src="https://placehold.co/600x400" class="card-img-top" alt="${repo.name}">
            <div class="card-body">
                <h5 class="card-title ">${repo.name}</h5>
                <p class="card-text">${repo.description}</p>
                <a href="${repo.homepage}" class="btn btn-primary button-link mb-2 project-buttons" target = blank>Live Test</a>
                <a href="${repo.svn_url}" class="btn btn-primary button-link project-buttons" target = blank>Check code</a>
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
