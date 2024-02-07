export type UserRepos = {
        name:string,
        private:boolean,
        svn_url:string,
        topics:[string],
        visibility:string,
        description:string,
        homepage:string
}[]

export type RepoReadme = {
        content:string
        message?:string
}