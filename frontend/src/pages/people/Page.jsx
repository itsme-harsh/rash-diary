import React from 'react'
import Layout from '../Layout'
import PeopleContent from '../../components/People/PeopleContent'
function Page() {
    return (
        <Layout>
            <PeopleContent />
        </Layout>
    )
}

export default React.memo(Page)