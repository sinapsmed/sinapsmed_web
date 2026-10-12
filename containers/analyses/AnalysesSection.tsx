'use client'
import AnalysisList from '@/components/analysis/AnalysisList'
import ResetChoiceButton from '@/components/analysis/ResetChoiceButton'
import LocaleLink from '@/components/commons/LocaleLink'
import Modal from '@/components/commons/Modal'
import OutlinedField from '@/components/commons/OutlinedField'
import SearchBar from '@/components/commons/SearchBar'
import { useFetchContext } from '@/components/providers/FetchProvider'
import { useSession } from '@/components/providers/SessionProvider'
import { alwaysString } from '@/libs/string'
import { Analysis, AnalysisCategory } from '@/types/analysis'
import { CartItem } from '@/types/cart'
import { ItemType } from '@/types/enum'
import { WithPage } from '@/types/pagination'
import { faFilterCircleXmark, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Checkbox, MenuItem, Pagination, Select, SelectChangeEvent, Snackbar } from '@mui/material'
import { useTranslations } from 'next-intl'
import React, { useMemo, useState } from 'react'

interface Props {
  cats?: AnalysisCategory[]
  cartItems: CartItem[]
}

const AnalysesSection = ({ cats, cartItems }: Props) => {
  const [state, pending, queries, setQuery] = useFetchContext<WithPage<Analysis>>()
  const [selectedCategories, setSelectedCategories] = useState<string[]>(queries.cat as string[])
  const t = useTranslations('analyses')
  const chooseCategory = t('category')
  const handleCatChange = (event: SelectChangeEvent<string[]>) => {
    setQuery('cat', event.target.value)
    setSelectedCategories(event.target.value as string[])
  }

  const renderPlaceholder = (selected: string[]) => {
    return selected.length > 0 ? `${chooseCategory} (${selected.length})` : chooseCategory
  }

  const [resetKey, setResetKey] = useState(0);

  const reset = async () => {
    await setQuery('s', '', 'cat', [])
    setSelectedCategories([])
    setResetKey(prev => prev + 1)
  }

  const defaultUserName = useMemo(() => {
    return cartItems.find(x => x.type == ItemType.Analysis)?.userName
  }, [cartItems])
  const [userName, setUserName] = useState(['', defaultUserName ?? ''])
  const [open, setOpen] = useState(!defaultUserName)
  const [error, setError] = useState<string | null>(null)
  const closeModal = () => {
    if (userName[1]) setOpen(false)
  }

  const openModal = () => {
    if (defaultUserName) {
      setError(t("patientError"))
    }
    else setOpen(true)
  }

  const submitPatient = () => {
    setUserName([userName[0], userName[0]])
    setOpen(false)
  }

  const session = useSession()
  return (
    <>
      <Snackbar
        open={!!error}
        autoHideDuration={5000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="error"
          onClose={() => setError(null)}
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
      <section id='analyses-section' className='sectionBox space-y-2'>
        <Alert severity='info'>
          {t('info')}
        </Alert>
        <div className='flex flex-col sm:flex-row gap-2'>
          {
            userName[1] && <div className="flex items-center justify-between sm:w-fit gap-3 px-3 py-4 border border-gray-300 rounded">
              <span className="text-gray-800">
                <strong>Pasiyent: </strong> {userName[1]}
              </span>
              <button
                onClick={openModal}
                className="text-blue-500 hover:text-blue-700 transition-colors"
                aria-label="Edit patient name"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
            </div>
          }
          <ResetChoiceButton />
        </div>
        <Modal disableAutoFocus open={open && !defaultUserName && !!session} onClose={closeModal}>
          <div className='space-y-2'>
            <Alert severity='info'>
              {t('patientWarning')}
            </Alert>
            <OutlinedField
              size='medium'
              label="Pasiyentin Adı/Soyadı"
              value={userName[0]}
              required
              onChange={(e) => setUserName([e.target.value, userName[1]])}
            />
            <div className='grid grid-cols-2 gap-2'>
              <LocaleLink href={'/'} className='p-3 w-full text-center font-semibold rounded bg-yellow-500 text-white'>
                Geriyə
              </LocaleLink>
              <button onClick={submitPatient} disabled={!userName[0]} className='p-3 font-semibold w-full rounded bg-blue-500 text-white'>
                Təsdiqlə
              </button>
            </div>
          </div>
        </Modal>
        <div className='flex flex-col md:flex-row gap-3'>
          <SearchBar resetKey={resetKey} className='w-full md:w-1/2' value={alwaysString(queries.s)} label={t('search')} onSearch={(value) => setQuery('s', value?.trimEnd() ?? '', 'page', '1')} />
          {cats && (
            <Select
              multiple
              value={selectedCategories}
              onChange={handleCatChange}
              displayEmpty
              renderValue={(selected) => renderPlaceholder(selected as string[])}
            >
              {cats.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  <Checkbox checked={selectedCategories.includes(cat.id)} />
                  <p>{cat.name}</p>
                </MenuItem>
              ))}
            </Select>
          )}
          <button onClick={reset} className='h-[56px] px-6 flex flex-center text-center rounded bg-red-500 text-white text-lg'>
            <FontAwesomeIcon icon={faFilterCircleXmark} />
          </button>
        </div>
        <AnalysisList userName={userName[1]} cartItems={cartItems} pending={pending} data={state.data} />
        {
          state.pageCount > 1 && <div className='flex justify-center !mt-5'>
            <Pagination page={+queries.page} onChange={(e, value) => setQuery('page', `${value}`)} count={state.pageCount} shape="rounded" />
          </div>
        }
      </section>
    </>
  )
}

export default AnalysesSection
