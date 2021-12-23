import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, setDoc, query, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';


function Offer() {
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();

    useEffect(() => {
        const fetchListings = async () => {
            try {
                const listingRef = collection(db, 'listings');
                const q = query(listingRef, where('offer', '==', true), orderBy('timestamp', 'desc'), limit(10));


                const querySnap = await getDocs(q);
                const listings = [];
                querySnap.forEach((doc) => {
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings);
                setLoading(false);

            }
            catch (error) {
                console.log(error);
            }
        }

        fetchListings()
    }, [])

    return (
        <div className='category'>
            <header>
                <p className='pageHeader'>
                    Offers
                </p>
            </header>
            {loading ? <p>Loading</p> :
                listings && listings.length > 0
                    ? <> <main> <ul className='categoryLisitngs'>
                        {listings.map((listing) => {
                            return <ListingItem listing={listing.data} key={listing.id} id={listing.id}/>
                        })}</ul> </main> </> : <p>No Offers </p>}

        </div>
    )
}

export default Offer;
