import React from 'react'
import "@/components/CSSFile/styles.scss"

export default function ShowEventDetails({detailHTML}) {
  return (
    <div className='prose'>
      <div dangerouslySetInnerHTML={{ __html: detailHTML }} />
    </div>
  )
}
