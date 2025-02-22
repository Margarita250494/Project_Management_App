import React from 'react'
import PrirorityPage from '../reusablePriorityPage'
import { Priority } from '@/state/types'

const High = () => {
  return (
    <PrirorityPage priority={Priority.High}/>
  )
}

export default High