import React from 'react'


type TableProps = {
    theads: string[];
    children?: React.ReactNode;
}

const Table = ({theads, children}: TableProps) => {
  return (
    <table className="bg-card border border-border rounded-lg">
        <thead className="bg-secondary text-secondary-foreground">
            <tr>
                {theads.map((thead, index) => (
                    <th key={index} className='p-2'>{thead}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {children}
        </tbody>
    </table>
  )
}

export default Table