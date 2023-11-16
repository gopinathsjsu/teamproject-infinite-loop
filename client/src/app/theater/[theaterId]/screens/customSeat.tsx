import Head from 'next/head'
import { useState, useEffect, useContext } from 'react'

import { Movie, Seats } from '@/src/lib/types'
import styles from './Customize.module.scss'

const screen =
{
    id: 5,
    ticketCost: 200,
    rows: 20,
    cols: 6,
    seats: {
        A: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        B: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        C: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        D: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        E: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        F: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        G: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
}

const CustomizeRows = ({ onDataFromChild }: { onDataFromChild: any }) => {

    const [seatDetails, setSeatDetails] = useState<Seats>(screen?.seats || {});
    const [row, setRow] = useState<number>(screen?.rows || 0);
    const [column, setColumn] = useState<number>(screen?.cols || 0);
    const [editable, setEditable] = useState<boolean>(false);

    useEffect(() => { clearSelectedSeats(); }, [])

    useEffect(() => {
        handleSubmit();
    }, [row, column])

    const clearSelectedSeats = () => {
        let newMovieSeatDetails = { ...seatDetails };
        for (let key in seatDetails) {
            seatDetails[key].forEach((seatValue, seatIndex) => {
                if (seatValue === 2) {
                    seatDetails[key][seatIndex] = 0;
                }
            })
        }
        return newMovieSeatDetails;
    }

    const handleSubmit = () => {
        let newSeatObject: Seats = {};
        let key: string;
        for (let i = 0; i < column; i++) {
            if (i < 26) {
                key = String.fromCharCode(65 + i)
            } else {
                let character = String.fromCharCode(64 + (i / 25));
                key = `${character}${String.fromCharCode(64 + i % 25)}`;
            }
            newSeatObject[key] = Array(row).fill(0).map((_, i) => {
                if (seatDetails && seatDetails[key] && seatDetails[key][i]) {
                    return seatDetails[key][i];
                } else {
                    return 0;
                }
            });
        }
        console.log(seatDetails)
        setSeatDetails(newSeatObject);
    }

    const changeEditable = () => {
        setEditable(!editable);
    }

    const handleSaveSetup = async () => {
        console.log(seatDetails);
        onDataFromChild(seatDetails);
        setEditable(!editable);
        // let movieIndex = movies.findIndex(mov => mov.id === parseInt(id));
        // if (movieIndex !== -1 && setMovies) {
        //     movies[movieIndex].seats = seatDetails;
        //     setMovies(movies);
        //     router.push(`/details/${id}`);
        // }
    }

    const RenderInputFields = () => {
        return (
            <div className={styles.inputContainer}>
                {editable ?
                    <>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Row</span>
                            </label>
                            <input type="number" name="row" value={row} onChange={(e) => setRow(parseInt(e.target.value) || 0)} className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Column</span>
                            </label>
                            <input type="number" value={column} onChange={(e) => setColumn(parseInt(e.target.value) || 0)} className="input input-bordered w-full max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs mt-9">
                            <button onClick={handleSaveSetup} className="btn">
                                Save Setup
                            </button>
                        </div>
                    </>
                    :
                    <div className="form-control w-full max-w-xs mt-9">
                        <button onClick={changeEditable} className="btn">
                            Edit Layout
                        </button>
                    </div>
                }

            </div>
        )
    }

    const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
        if (seatDetails) {
            if (seatValue === 1) {
                return;
            } else if (seatValue === 0) {
                seatDetails[key][rowIndex] = 3;
            } else {
                seatDetails[key][rowIndex] = 0;
            }
        }
        setSeatDetails({ ...seatDetails });
    }

    /**
     * 0 - Not booked
     * 1 - Booked
     * 2 - Selected
     * 3 - Blocked
     */
    const getClassNameForSeats = (seatValue: number) => {
        let dynamicClass;
        if (seatValue === 0) {  // Not booked
            dynamicClass = styles.seatNotBooked;
        } else if (seatValue === 1) {  // booked
            dynamicClass = styles.seatBooked;
        } else if (seatValue === 2) {  // Seat Selected
            dynamicClass = styles.seatSelected;
        } else {  // Seat Blocked
            dynamicClass = styles.seatBlocked;
        }
        return `${styles.seats} ${dynamicClass}`
    }

    const RenderFormatedSeats = () => {
        let seatArray = [];
        for (let key in seatDetails) {
            let index = 0;
            let colValue = seatDetails[key].map((seatValue, rowIndex) => (
                <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
                    {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
                    {seatValue !== 3 ? <span className={getClassNameForSeats(seatValue)}>
                        {index = index + 1}
                    </span> :
                        <span className={getClassNameForSeats(1)}>
                            {rowIndex + 1}
                        </span>
                    }
                    {seatDetails && rowIndex === seatDetails[key].length - 1 && <><br /><br /></>}
                </span>
            ))
            seatArray.push(colValue);
        }
        return (
            <div className={styles.seatsLeafContainer}>{seatArray}</div>
        )
    }

    const RenderSeats = () => {
        let seatArray = [];
        for (let key in seatDetails) {
            let colValue = seatDetails[key].map((seatValue, rowIndex) => (
                <span key={`${key}.${rowIndex}`} className={styles.seatsHolder}>
                    {rowIndex === 0 && <span className={styles.colName}>{key}</span>}
                    <span className={getClassNameForSeats(seatValue)} onClick={() => onSeatClick(seatValue, rowIndex, key)}>
                        {rowIndex + 1}
                    </span>
                    {seatDetails && rowIndex === seatDetails[key].length - 1 && <><br /><br /></>}
                </span>
            ))
            seatArray.push(colValue);
        }
        console.log(seatArray);
        return (
            <div className={styles.seatsLeafContainer}>{seatArray}</div>
        )
    }

    return (
        <>
            <Head>
                <title>Customize Rows</title>
            </Head>
            <div className={styles.seatsContainer}>
                {RenderInputFields()}
                <p className={styles.header}>Select Seats to be <b className={styles.headerBlockedText}>Removed</b></p>
                {seatDetails && editable && <RenderSeats />}
                {seatDetails && !editable && <RenderFormatedSeats />}
            </div>
        </>
    );
}

export default CustomizeRows;