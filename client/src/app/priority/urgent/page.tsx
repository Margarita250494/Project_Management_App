import React from 'react'
import PrirorityPage from '../reusablePriorityPage'
import { Priority } from '@/state/types'

const Urgent = () => {
  return (
    <PrirorityPage priority={Priority.Urgent}/>
  )
}

export default Urgent