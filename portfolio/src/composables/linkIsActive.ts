import { ref} from "vue";

export default function linkIsActive() {

  const isActive = ref()

  function setLinkActive(i: number) {
    isActive.value = i
}

    return {isActive, setLinkActive};
  }