import React from 'react'
import DrawerComponent from '../../components/DrawerComponent'
import { Outlet } from 'react-router-dom'

export default function AdminDashboard() {
  return (
    <>
    <DrawerComponent>

    <Outlet/>
    </DrawerComponent>
    </>
  )
}
