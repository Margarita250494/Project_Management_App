import React from 'react'
import PrirorityPage from '../reusablePriorityPage'
import { Priority } from '@/state/types'

const Low = () => {
  return (
    <PrirorityPage priority={Priority.Low}/>
  )
}

export default Low