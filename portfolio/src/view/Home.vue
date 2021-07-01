<template>
    <h1>This is the Hompepage</h1>
    <!-- <h2 v-for="repo in repos" key="repo.id">
        {{repo.name}}
        </h2>
        -----------------------
        <h2 v-for="(repos, key) in languages">
        {{key}}  
        </h2>
        ------------------------
        <h2>
            {{content}}
        </h2> -->
        <h2 v-for="a in languages">
            {{a}}
        </h2>

        <section class="filter">
            <article class="filter__item">all</article>
            <article class="filter__item">vue</article>
        </section>
        <section class="projects"></section>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
    name: 'Home',
    setup() {
        const repos = ref([])
        const language_url = ref([])
        const languages = ref([])
        const content = ref('')

        // const fetchRepo = async () => {
        //     const url = 'https://api.github.com/users/Mesterduc/repos'
        //     const respose = await fetch(url)
        //     const result = await respose.json()
        //     // console.log(result)
        //     repos.value = result
        //     result.forEach(e => {
        //         languages.value.push(e.languages_url)
        //     });
        //     // console.log(languages.value)
        // }
         onMounted(async () =>  {
            const url = 'https://api.github.com/users/Mesterduc/repos'
            const respose = await fetch(url)
            const result = await respose.json()
            // console.log(result)
            repos.value = result
            result.forEach(async e => {
                const url = e.languages_url
                const respose = await fetch(url)
                const result = await respose.json()
                languages.value.push(result)
            });
        })

        // const fetchLanguage = async () => {
        //     console.log(repos.value)
            // repos.forEach(repo => {
                //     console.log(repos.value)
            // });
            // console.log(languages)
            // languages.value.forEach(e => {
            //     console.log(e)
            // });

            // const url = 'https://api.github.com/repos/Mesterduc/Mundhaeld/languages'
            // const respose = await fetch(url)
            // const result = await respose.json()
            // console.log(result)
            // languages.value = result

        // }
        // fetchLanguage()
                // fetchRepo().then(r => {
                //     languages.value.forEach(e => {
                //         // console.log(e)
                //     });
                // })

        const fetchReadme = async () => {
            const url = 'https://api.github.com/repos/Mesterduc/walkSite/contents/walksite/README.md'
            const respose = await fetch(url )
            const result = await respose.json()
            // console.log(result.content)
            
            content.value = atob(result.content)

        }
        fetchReadme()

        return {repos, languages, content}
        
    },
})
</script>




<style lang="scss" scoped>
.filter{
    display: flex;
    justify-content: center;

    &__item{
        font-size: 2.2em;
        text-transform: uppercase;
        margin: 0 1em 0 1em;

    }


}

</style>
