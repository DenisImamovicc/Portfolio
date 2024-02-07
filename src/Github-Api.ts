import { RepoReadme, UserRepos } from "./types";

export const getMyRepos = async () => {
  const response = await fetch(
    `https://api.github.com/users/DenisImamovicc/repos`
  );

  if (!response.ok) {
    throw new Error(`Status code: ${response.status}`);
  }

  const data: UserRepos = await response.json();
  return data;
};

export const getRepoReadme = async (repoName:string) => {
  const response = await fetch(
    `  https://api.github.com/repos/DenisImamovicc/${repoName}/readme`
  );

  if (!response.ok) {
    new Error(`Status code: ${response.status}`)
  }

  const data: RepoReadme = await response.json();
  return data;
};