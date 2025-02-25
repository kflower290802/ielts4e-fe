import React from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
interface IProps {
  setOpenDia: React.Dispatch<React.SetStateAction<boolean>>,
  openDia: boolean
  totalAnswered: number
  totalQuestion: number | undefined
}
const DialogConfirm = ({openDia, setOpenDia, totalQuestion, totalAnswered}: IProps) => {
  return (
    <Dialog open={openDia} onOpenChange={setOpenDia}>
      <DialogContent className="md:w-full w-96 flex flex-col items-center md:h-56 h-96 bg-[#3C64CE] text-white font-bold md:p-4 p-6 text-center">
          <span>YOU HAVE COMPLETED {totalAnswered} / {totalQuestion} QUESTIONS.</span>
          <span>YOU HAVE 10 MINUTES LEFT </span>
          <span>ARE YOU SURE YOU WANT TO SUBMIT?</span>
          <div className='flex justify-between items-center w-2/3'>
            <Button className='bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl'>Review</Button>
            <Button className='bg-[#66B032] hover:bg-[#66B032]/80 text-white font-bold rounded-xl'>Submit</Button>
          </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogConfirm
