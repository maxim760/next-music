import { useState } from "react"

export const useInput = (intitial: string = "") => {
  const [value, setValue] = useState(intitial)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)
  return {value, onChange}
}