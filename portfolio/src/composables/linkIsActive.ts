import { ref} from "vue";

export default function linkIsActive() {

  const isActive = ref()

  function setLinkActive(i: number) {
    isActive.value = i
}


const isRepoActive = ref()
  function setRepoActive(i: number) {
    isRepoActive.value = i
}

    return {isActive, setLinkActive, isRepoActive, setRepoActive};
  }