import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React from 'react'

const Article1 = () => {
    const t = useTranslations('agreement.article1')
    const header = useTranslations('agreement')
    const firstlaws: string[] = t.raw('firstArticle.laws')
    const secondlaws: string[] = t.raw('secondArticle.laws')

    return (
        <div>
            <h1>{header('articleHeader', { no: 1, title: t('title') })}</h1>
            <p>{t('firstArticle.desc')}</p>
            <ol className='list-decimal list-inside mb-1 italic'>
                {
                    firstlaws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
                <li>{t('firstArticle.thirdLaw')}
                    <Link className='text-blue-800' href={'mailto:info@sinapsmed.com'}>info@sinapsmed.com</Link>{')'}
                </li>
            </ol>
            <p>{t('secondArticle.desc')}</p>
            <ol className='list-decimal list-inside mb-1 italic'>
                {
                    secondlaws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
            </ol>
        </div>
    )
}

const Article2 = () => {
    const t = useTranslations('agreement.article2')
    const header = useTranslations('agreement')
    const laws: string[] = t.raw('laws')

    return (
        <div>
            <h1>{header('articleHeader', { no: 2, title: t('title') })}</h1>
            <ol className='list-decimal list-inside mb-1 italic'>
                {
                    laws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
            </ol>
        </div>
    )
}

const Article3 = () => {
    const t = useTranslations('agreement.article3')
    const header = useTranslations('agreement')

    return (
        <div>
            <h1>{header('articleHeader', { no: 3, title: t('title') })}</h1>
            <p>{t('desc')}</p>
        </div>
    )
}

const Article4 = () => {
    const t = useTranslations('agreement.article4')
    const header = useTranslations('agreement')
    const laws: string[] = t.raw('laws')

    return (
        <div>
            <h1>{header('articleHeader', { no: 4, title: t('title') })}</h1>
            <ol className='list-decimal list-inside mb-1 italic'>
                {
                    laws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
            </ol>
        </div>
    )
}

const Article5 = () => {
    const t = useTranslations('agreement.article5')
    const header = useTranslations('agreement')
    const laws: string[] = t.raw('laws')

    return (
        <div>
            <h1>{header('articleHeader', { no: 5, title: t('title') })}</h1>
            <ol className='list-decimal list-inside mb-1 italic'>
                {
                    laws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
            </ol>
        </div>
    )
}

const Article6 = () => {
    const t = useTranslations('agreement.article6')
    const header = useTranslations('agreement')
    const laws: string[] = t.raw('laws')

    return (
        <div>
            <h1>{header('articleHeader', { no: 6, title: t('title') })}</h1>
            <ol className='list-decimal list-inside mb-1 italic'>
                {
                    laws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
            </ol>
        </div>
    )
}

const Article7 = () => {
    const t = useTranslations('agreement.article7')
    const header = useTranslations('agreement')
    const laws: string[] = t.raw('laws')

    return (
        <div>
            <h1>{header('articleHeader', { no: 7, title: t('title') })}</h1>
            <ol className='list-decimal list-inside mb-1 italic'>
                {
                    laws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
            </ol>
        </div>
    )
}

const Article8 = () => {
    const t = useTranslations('agreement.article8')
    const header = useTranslations('agreement')
    const laws: string[] = t.raw('laws')
    const otherLaws: string[] = t.raw('otherLaws')
    return (
        <div>
            <h1>{header('articleHeader', { no: 8, title: t('title') })}</h1>
            <ol className='list-decimal list-inside mb-1 italic'>
                {
                    laws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
                <li>{otherLaws[0]}
                    <Link className='text-blue-800 px-1' href={'mailto:info@sinapsmed.com'}>info@sinapsmed.com</Link>
                    {otherLaws[1]}
                </li>
            </ol>
        </div>
    )
}

const Article9 = () => {
    const t = useTranslations('agreement.article9')
    const header = useTranslations('agreement')
    const laws: string[] = t.raw('laws')
    const otherLaws: string[] = t.raw('otherLaws')
    return (
        <div>
            <h1>{header('articleHeader', { no: 9, title: t('title') })}</h1>
            <ol className='list-decimal list-inside mb-1 italic'>
                <li>{otherLaws[0]}
                    <Link className='text-blue-800 px-1' href={'mailto:info@sinapsmed.com'}>info@sinapsmed.com</Link>
                    {otherLaws[1]}
                </li>
                {
                    laws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
            </ol>
        </div>
    )
}

const Article10 = () => {
    const t = useTranslations('agreement.article10')
    const header = useTranslations('agreement')
    const laws: string[] = t.raw('laws')

    return (
        <div>
            <h1>{header('articleHeader', { no: 10, title: t('title') })}</h1>
            <ol className='list-decimal list-inside mb-1 italic'>
                {
                    laws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
            </ol>
        </div>
    )
}

const OtherArticle = () => {
    const t = useTranslations('agreement.otherArticle')
    const laws: string[] = t.raw('laws')

    return (
        <div>
            <h1>
                <span className='font-semibold'>{t('title')} </span>
                <span>{t('altTitle')}</span>
            </h1>
            <ol className='list-decimal list-inside mb-1 italic'>
                {
                    laws.map((law, index) => (
                        <li key={index}>{law}</li>
                    ))
                }
            </ol>
        </div>
    )
}
export { Article1, Article2, Article3, Article4, Article5, Article6, Article7, Article8, Article9, Article10, OtherArticle }