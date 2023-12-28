import { json } from '@sveltejs/kit'

/**
 * @param {String} id - The user's ID.
 */
export async function GET(id) {
    // make a request to api using token in headers
    const res = await fetch(`http://localgost/user/${id}`, {
        headers: {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
            'x-api-token': 'f9m8j91uK2iwzx!ICSQ6xLx3p2L4W30!dgIqaKoFy!?LFmy-XS1=PUI/I6Umom9C45?wmvQ/JmvNSvKDbknK=QMx5p/USvCleN-9J?ScBYZ9ZeO=-yUzzW7P6wuWEyQxZ9t2Sn9WyZHEA3Vu7jp43-nACrApbpygJU126s8FuCQTM5fc!4tKYsFlpS6Wdb=LtFP6g7dRC0kogk-3X6y?!7t0j?DlDE6-RrcWiS5XXn2X-XERVILQSg!iFobmYPky'
        }
    });


    return json(res.body)

}