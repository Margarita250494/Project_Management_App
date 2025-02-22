import React from 'react'
import PrirorityPage from '../reusablePriorityPage'
import { Priority } from '@/state/types'

const Backlog = () => {
  return (
    <PrirorityPage priority={Priority.Backlog}/>
  )
}

export default Backlog