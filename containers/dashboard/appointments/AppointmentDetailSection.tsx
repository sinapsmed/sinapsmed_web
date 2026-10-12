'use client'
import { UserAppointmentDetail } from '@/types/user';
import React, { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faUser,
  faLink,
  faVenusMars,
  faBirthdayCake,
  faPaperclip,
  faMoneyBill,
  faKey,
  faClock,
  faCalendarPlus,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import Container from '@/components/statics/dashboard/Container';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import Image from 'next/image';
import AddAttachment from '@/components/dashboard/appointments/AddAttachment';
import { createUrl } from '@/libs/query';
import Modal from '@/components/commons/Modal';
import useLocalStorage from '@/hooks/useLocalStorage';
import useFormatDate from '@/hooks/date';
import InfoBadgeForUTC from '@/components/statics/InfoBadgeForUTC';

interface Props {
  data: UserAppointmentDetail;
}

const AppointmentDetailSection = ({ data }: Props) => {
  const {
    unikalKey,
    price,
    expertName,
    expertImageUrl,
    userNote,
    serviceName,
    duration,
    userWhatsApp,
    appointmentType,
    status,
    additionalUser,
    attachments,
    sessions = [],
  } = data;
  
  const [showDeviceSupportAlert, setShowDeviceSupportAlert] = useLocalStorage('showDeviceSupportAlert', true)
  const [isDeviceSupportModalOpen, setIsDeviceSupportModalOpen] = React.useState(false);

  const t = useTranslations('');
  const advise = t.raw('expert.appointment.info.advise');
  const statuses = t.raw('payment.statuses');
  const d = t.raw('dashboard.appointment.detail');


  const getCalendarLink = (startIso: string) => {
    const start = new Date(startIso);
    const end = new Date(start.getTime() + (duration ?? 0) * 60000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0];
    return createUrl('https://calendar.google.com/calendar/render', {
      action: 'TEMPLATE',
      text: t('dashboard.appointment.detail.meetWith', { expert: expertName }),
      dates: `${fmt(start)}/${fmt(end)}`
    });
  };
  const nextSessionId = useMemo(() => {
    const now = Date.now();
    const future = sessions.filter(s => new Date(s.date).getTime() >= now);
    if (!future.length) return null;
    const nearest = future.reduce((min, s) =>
      new Date(s.date) < new Date(min.date) ? s : min, future[0]);
    return nearest.id;
  }, [sessions]);

  const formatDate = useFormatDate()
  return (
    <section id="appointment-detail-section" className="space-y-2">
      <div className="grid lg:grid-cols-2 gap-2">
        <Container className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative w-24 h-24">
              <Image
                src={expertImageUrl}
                alt={expertName}
                fill
                className="rounded-full object-cover border-4 border-indigo-100"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-gray-800">{expertName}</h2>
              <div className="text-gray-500 flex items-center gap-2 mt-1">
                <FontAwesomeIcon icon={faKey} />
                <div className="flex items-center gap-1">
                  <span className="truncate">{unikalKey}</span>
                </div>
              </div>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <FontAwesomeIcon icon={faClock} />
                {t('date.periods.min', { count: duration })}
              </p>
              <p className="text-gray-500 flex items-center gap-2 mt-1">
                <FontAwesomeIcon icon={faMoneyBill} />
                {price ? <span>{price}₼</span> : <span className="italic">{t('dashboard.appointment.free')}</span>}
              </p>
            </div>
          </div>
        </Container>

        <Container className="p-6 space-y-2">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{d.other['label']}</h3>
          <div className="space-y-1 text-gray-700">
            <div>
              <strong>{d.other['service']}:</strong> {serviceName}
            </div>
            <div>
              <strong>{d.other['status']}:</strong>{' '}
              <span className="text-indigo-600 font-semibold">{statuses[status]}</span>
            </div>
            <div>
              <strong>{d.other['forWhom']}:</strong> {advise.options[appointmentType - 1]} {advise.for}
            </div>
            <div>
              <strong>{d.other['whatsapp']}:</strong> {userWhatsApp}
            </div>
          </div>
        </Container>
      </div>

      {showDeviceSupportAlert && (
        <Container
          aria-live="polite"
          className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-900"
        >
          <FontAwesomeIcon icon={faTriangleExclamation} className="mt-0.5 text-amber-500" />
          <div className="flex-1 text-sm leading-6">
            <strong className="font-semibold">{t('deviceSupportAlert.warning')}:</strong>{' '}
            {t('deviceSupportAlert.short')}
            <div className="mt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsDeviceSupportModalOpen(true)}
                className="rounded bg-amber-100 px-3 py-1.5 text-xs font-medium hover:bg-amber-200"
              >
                {t('deviceSupportAlert.actions.readMore')}
              </button>
              <button
                type="button"
                onClick={() => setShowDeviceSupportAlert(false)}
                className="rounded bg-white px-3 py-1.5 text-xs font-medium text-amber-900 ring-1 ring-amber-200 hover:bg-amber-100"
              >
                {t('deviceSupportAlert.actions.dismiss')}
              </button>
            </div>
          </div>

          <Modal open={isDeviceSupportModalOpen} onClose={() => setIsDeviceSupportModalOpen(false)}>
            <div className="space-y-3 p-2 text-gray-800">
              <h4 className="text-lg font-semibold">{t('deviceSupportAlert.title')}</h4>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {t.raw('deviceSupportAlert.points').map((point: string, idx: number) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeviceSupportModalOpen(false)}
                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  {t('deviceSupportAlert.actions.ok')}
                </button>
              </div>
            </div>
          </Modal>
        </Container>
      )}

      {additionalUser && (
        <Container className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{d['userDetails']}</h3>
          <div className="grid md:grid-cols-3 gap-4 text-gray-700">
            <div>
              <FontAwesomeIcon icon={faUser} className="mr-2 text-indigo-500" />
              {additionalUser.fullName}
            </div>
            <div>
              <FontAwesomeIcon icon={faBirthdayCake} className="mr-2 text-pink-400" />
              {additionalUser.dateOfBrith.split('T')[0]}
            </div>
            <div>
              <FontAwesomeIcon icon={faVenusMars} className="mr-2 text-purple-500" />
              {additionalUser.gender ? t('register.male') : t('register.female')}
            </div>
          </div>
        </Container>
      )}

      {userNote && (
        <Container className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{d['note']}</h3>
          <p className="text-gray-700">{userNote}</p>
        </Container>
      )}
      {sessions.length > 0 && (
        <Container className="p-6 space-y-3">
                        <InfoBadgeForUTC />

          <h3 className="text-xl font-semibold text-gray-800">{d['sessions'] ?? 'Seanslar'}</h3>
          <div className="grid gap-3">
            {sessions.map((s) => {
              const isNext = s.id === nextSessionId;
              return (
                <div
                  key={s.id}
                  className={
                    `flex flex-col md:flex-row md:items-center justify-between gap-3 rounded-md border p-3 ` +
                    (isNext ? 'border-blue-500 bg-blue-50' : '')
                  }
                >
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCalendarAlt} className={isNext ? 'text-blue-600' : 'text-blue-500'} />
                    <div>
                      <p className="font-medium">
                        <span>{formatDate(s.date)}</span>
                        {isNext && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                            {d['upcoming']}
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-gray-500 break-all">{s.meetLink}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Link href={s.meetLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-medium text-center py-2 px-3 sm:px-4 rounded text-sm sm:text-base bg-blue-500 text-white hover:bg-yellow-600 ">
                      <FontAwesomeIcon icon={faLink} />
                      <span>{d['join']}</span>
                    </Link>
                    <Link href={getCalendarLink(s.date)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 p-1 font-medium text-center py-2 px-3 sm:px-4 rounded text-sm sm:text-base bg-green-500 text-white hover:bg-green-600">
                      <FontAwesomeIcon icon={faCalendarPlus} />
                      <span>{d['addCalendar']}</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </Container>
      )}

      <Container className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{d.attachments['label']}</h3>
          <AddAttachment />
        </div>

        {attachments.length === 0 ? (
          <p className="text-gray-500 text-sm">{d.attachments['empty']}</p>
        ) : (
          <ul className="space-y-2">
            {attachments.map((att, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <span className="text-gray-700 flex items-center gap-2">
                  <FontAwesomeIcon icon={faPaperclip} className="text-indigo-500" />
                  {att.title}
                </span>
                <Link
                  href={att.attachment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm"
                >
                  {d.attachments['view']}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
};

export default AppointmentDetailSection;
