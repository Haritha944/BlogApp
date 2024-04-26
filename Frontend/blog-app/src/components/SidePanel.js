import React from 'react';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LockIcon from '@mui/icons-material/Lock';
import VpnLockIcon from '@mui/icons-material/VpnLock';

const SidePanel = () => {
  return (
    <div className='shadow -lg'>
        <div className='text-center py-5'>
         <h4 className='font-semibold'>Over 12000 Readers visits our blog per day!!!</h4>
         <div className='flex gap-2 flex-wrap justify-evenly mt-3 cursor-pointer'>
         <div className=''>
            <EditNoteIcon />
             <p> Start writing </p>
         </div>
         <div>
            <ShoppingCartIcon />
             <p>Create an Ecommerce website </p>
         </div>
         <div>
            <LockIcon />
             <p>Cyber Security Course</p>
         </div>
         <div>
            <VpnLockIcon />
             <p>Devops Course</p>
         </div>
         </div>
        </div>
        </div>
  )
}

export default SidePanel