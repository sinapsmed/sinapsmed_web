"use client";
import React, { useState, useMemo, SyntheticEvent } from "react";
import {
    Calendar,
    dateFnsLocalizer,
    Event,
    Formats,
    Messages,
    View,
    Views,
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import az from "date-fns/locale/az";
import ru from "date-fns/locale/ru";
import { useLocale, useTranslations } from "next-intl";
import { CircularProgress, Menu, MenuItem } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faStethoscope } from "@fortawesome/free-solid-svg-icons";
import ButtonLink from "./ButtonLink";
import useFormatDate from "@/hooks/date";

const localeMap: Record<string, Locale> = {
    en: enUS,
    az: az,
    ru: ru,
};

export interface DataEvent {
    start: string,
    end: string,
    serviceName: string,
    appointmentId: string,
    fullName: string
}

export interface CustomEvent extends Event, Omit<DataEvent, keyof Event> {
}

interface Props {
    events: DataEvent[];
    value: Date;
    pending?: boolean;
    onChange?: (date: Date) => void;
    fullScreen?: boolean;
}

const EventCalendar = ({
    events,
    value,
    pending = false,
    fullScreen = false,
    onChange
}: Props) => {

    const [currentView, setCurrentView] = useState<View>("month");
    const locale = useLocale();
    const t = useTranslations("calendar");
    const localizer = useMemo(() => {
        return dateFnsLocalizer({
            format,
            parse,
            startOfWeek: () => startOfWeek(new Date(), { locale: localeMap[locale] || enUS }),
            getDay,
            locales: localeMap,
        });
    }, [locale]);

    const getFormattedDate = (date: Date, formatString: string, locale: string) => {
        return format(date, formatString, { locale: localeMap[locale] });
    };

    const getTimeRangeFormat = (start: Date, end: Date, locale: string) => {
        return `${getFormattedDate(start, "HH:mm", locale)} - ${getFormattedDate(end, "HH:mm", locale)}`;
    };

    const formats: Formats = {
        monthHeaderFormat: (date: Date) =>
            getFormattedDate(date, "MMMM yyyy", locale),

        weekdayFormat: (date: Date) =>
            getFormattedDate(date, "EEE", locale),

        dayFormat: (date: Date) =>
            getFormattedDate(date, "dd EEE", locale),

        timeGutterFormat: (date: Date) =>
            getFormattedDate(date, "HH:mm", locale),

        dayHeaderFormat: (date: Date) =>
            getFormattedDate(date, "EEEE, dd MMMM", locale),

        agendaDateFormat: (date: Date) =>
            getFormattedDate(date, "EEEE MMMM dd", locale),

        agendaTimeFormat: (date: Date) =>
            getFormattedDate(date, "HH:mm", locale),

        agendaTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
            getTimeRangeFormat(start, end, locale),

        eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
            getTimeRangeFormat(start, end, locale),

        eventTimeRangeEndFormat: ({ start, end }: { start: Date; end: Date }) =>
            getTimeRangeFormat(start, end, locale),

        eventTimeRangeStartFormat: ({ start, end }: { start: Date; end: Date }) =>
            getTimeRangeFormat(start, end, locale)
    };

    const messages: Messages = {
        previous: '<',
        today: t('today'),
        next: '>',
        month: t('month'),
        week: t('week'),
        day: t('day'),
        agenda: t('agenda'),
        noEventsInRange: t('noEventsInRange'),
        date: t('date'),
        time: t('time'),
        event: t('event'),
        showMore: (count: number) => t("more", { count }),
    };

    const handleDateChange = (newDate: Date) => {
        onChange?.(newDate);
    };

    const transformedEvents = useMemo(() => {
        return events.map(event => {
            return {
                ...event,
                title: t('with', { fullname: event.fullName }),
                start: new Date(event.start),
                end: new Date(event.end),
            };
        });
    }, [events]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [selectedEvent, setSelectedEvent] = useState<CustomEvent | null>(null);

    const handleSelectEvent = (event: CustomEvent, e: SyntheticEvent) => {
        setAnchorEl(e.currentTarget as HTMLElement);
        setSelectedEvent(event);
    };

    const formatDate = useFormatDate(true)

    return (
        <div style={{ height: (fullScreen ? '98vh' : 800), minWidth: 500, position: "relative" }}>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                className='mt-2'
                disableAutoFocusItem
            >
                <MenuItem disableRipple
                    sx={{
                        "&.MuiMenuItem-root": {
                            cursor: "default",
                            "&:hover": { backgroundColor: "transparent" },
                        },
                    }}>
                    <div className="w-full sm:max-w-[300px] text-wrap">
                        <h1 className="text-center text-lg border-b pb-1 mb-2">
                            {selectedEvent?.title}
                        </h1>
                        <div className="mb-2">
                            <div className="flex gap-2 items-start">
                                <FontAwesomeIcon icon={faCalendarAlt} className="mt-1" />
                                <p>{selectedEvent?.start?formatDate(selectedEvent?.start?.toISOString()):'-'}</p>
                            </div>
                            <div className="flex gap-2 items-start">
                                <FontAwesomeIcon icon={faStethoscope} className="mt-1" />
                                <p>{selectedEvent?.serviceName}</p>
                            </div>
                        </div>
                        <ButtonLink href={`/dashboard/appointments/${selectedEvent?.appointmentId}`} className="w-full text-center btn btn-info">
                            Daha Çox
                        </ButtonLink>
                    </div>
                </MenuItem>
            </Menu>
            {pending && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 10,
                    }}
                >
                    <span style={{ fontSize: 24, fontWeight: "bold" }}>
                        <CircularProgress />
                    </span>
                </div>
            )}
            <Calendar
                localizer={localizer}
                events={transformedEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: "100%", width: "100%" }}
                view={currentView}
                onView={setCurrentView}
                messages={messages}
                formats={formats}
                date={value}
                onNavigate={handleDateChange}
                onSelectEvent={handleSelectEvent}
                views={[
                    Views.DAY,
                    Views.WEEK,
                    Views.MONTH,
                    Views.AGENDA
                ]}
            />
        </div>
    );
};

export default EventCalendar;
