export const DiskSpinner = ({loading}) => {
   return (
      <div className={loading ? 'cd-wrapper show' : 'cd-wrapper'}>
         <div className={loading ? 'cd-disk show' : 'cd-disk'}></div>
      </div>
   )
}