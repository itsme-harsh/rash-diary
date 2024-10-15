import React from 'react'
import Layout from '../Layout'
import Add from '../../components/People/Add'
function AddPeople() {
    return (
        <Layout>
            <Add/>
        </Layout>
    )
}

export default React.memo(AddPeople)