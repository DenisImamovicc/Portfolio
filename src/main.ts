import { ProjectList } from './DOM-selectors';
import { getMyRepos, getRepoReadme } from './Github-Api'
import './style.css'
import { UserRepos} from './types'


window.addEventListener("load",async() => {
    let myRepos;

    try {
        myRepos = await getMyRepos()
        console.log(myRepos);
    } catch (error) {
        console.log(error);
        renderRepos([])
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

const renderRepos = async (repos:UserRepos) => {
    if (!repos.length) {
        return ProjectList.innerHTML = "<h3>No projects found!</h3>"
    }
    const repoImgs = await getRepoPreviewImg(repos)
    return repos.map((repo,index) => {
        ProjectList.innerHTML += 
        `          
        <div class="card text-bg-info mb-2 col-12 col-md-5 col-lg-4 shadow-lg " style="width: 18rem;">
            <img src="${handleImgRender(repoImgs[index])}" class="card-img-top" alt="${repo.name}">
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

const handleImgRender = (url:String) => {
    if (url) {
        return url
    } else {
        return "https://placehold.co/600x400"
    }
}


const getRepoPreviewImg = async(repos:UserRepos) => {
    const repoNames = repos.map(repo => {
        return repo.name
    })
    console.log(repoNames);
    let repoReadMes = []

    for (const name of repoNames) {
        repoReadMes.push(await getRepoReadme(name)) 
        
    }
    console.log(repoReadMes);
    repoReadMes.forEach(readMe => {
        if (readMe.message) {
            return
        }
        readMe.content = atob(readMe.content)
    });
    console.log(repoReadMes);
    const repoImgs = repoReadMes.map(readme => {
        if (readme.message) {
            return getImgUrlFromContent("")
        }
        return getImgUrlFromContent(readme.content)
    });
    console.log(repoImgs);
    return repoImgs
}


const getImgUrlFromContent = (content:String) => {
    const regex = /!\[Preview_img\]\((.*?)\)/;
    const match = content.match(regex);
    
    if (match) {
        const url = match[1];
        console.log(url);
        return url
    } else {
        console.log("No URL found");
        return "https://placehold.co/600x400"
    }
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
