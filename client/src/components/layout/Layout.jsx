import React from 'react'
import Header from './Header'
import Footer from './Footer'
import SurveyLink from './SurveyLink'

export default function Layout({children}) {
  return (
    <div>
        <Header />

        <main>{children}</main>

        <SurveyLink />
        <Footer />
    </div>
  )
}
