// import * as React from 'react'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { global, SLUG } from '../utils/constants'
// import { TitleH2, InxtParagraph } from '../utils/styled-components-global'
import Layout from '../components/Layout'
import 'antd/lib/layout/style/css'
import '../static/styles/scss/pages-style/blog/index.scss'

// @ts-ignore
const BlogPage: NextPage = ({ data }) => {
  return (
    <Layout>
      <NextSeo
        titleTemplate={`%s | ${SLUG}`}
        title='Blog'
        noindex={false}
        description='Blog'
        canonical={`${global.COMPANYURL}/blog`}
        additionalMetaTags={[
          {
            name: 'X-UA-Compatible',
            content: 'IE=8; IE=9; IE=Edge'
          }, {
            name: 'keywords',
            content: 'index'
          }, {
            property: 'dc:creator',
            content: 'Eric Torres Andrade <erictorresandrade.1@gmail.com>'
          }, {
            name: 'revisit-after',
            content: '7 days'
          },
          {
            name: 'google',
            content: 'nositelinkssearchbox'
          },
        ]}
        openGraph={{
          url: global.COMPANYURL,
          title: 'Open Graph Title',
          description: 'Open Graph Description',
          images: [
            {
              url: global.COMPANYURL+'/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
            },
            {
              url: global.COMPANYURL+'/og-image-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
            },
            { url: global.COMPANYURL+'/og-image-03.jpg' },
            { url: global.COMPANYURL+'/og-image-04.jpg' },
          ],
          site_name: global.COMPANYURL,
        }}
        twitter={{
          handle: '@handle',
          site: global.COMPANYTWITTERACCOUNT,
          cardType: 'summary_large_image'
        }}
      />
        <div className='blog-wrapper-centered'>
          <h2 className="blog-title">Blog</h2>
          <p className="blog-subtitle">{data}</p>
        </div>
    </Layout>
  );
}

BlogPage.getInitialProps = async () => {
  console.log('getInitialProps')

  // const productsServices = new BlogService();
  // const data = await productsServices.getdata();
  const data: string = 'This is the Blog page'

  return { data };
}

export default BlogPage