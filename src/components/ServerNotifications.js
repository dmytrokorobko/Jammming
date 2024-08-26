export const ServerNotifications = ({serverLoading, serverError, clientError}) => {
   return (
      <div className="server-notifications">
         {serverLoading && <div className="server-loading">Loading...</div>}
         {serverError && <div className="server-error">Error: {serverError}</div>}
         {clientError && <div className="server-error">Error: {clientError}</div>}
      </div>
   )
}