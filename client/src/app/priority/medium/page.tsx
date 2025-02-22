import React from 'react'
import PrirorityPage from '../reusablePriorityPage'
import { Priority } from '@/state/types'

const Medium = () => {
  return (
    <PrirorityPage priority={Priority.Medium}/>
  )
}

export default Medium