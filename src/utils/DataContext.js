import React, { createContext, useState } from 'react'

const DataContext = createContext(false)

export const DataProvider = ({ children }) => {
    const [shouldReload, setShouldReload] = useState(true)

    return (
        <DataContext.Provider value={{ shouldReload, setShouldReload}}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext