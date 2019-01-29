import { requireTaskPool } from 'electron-remote';

export default function startService()
{
    console.log('start work');

    const work = requireTaskPool(require.resolve('./work'));

    work().then((result) =>
    {
        console.log('work done.');
        console.log(result);
    });

    work().then((result) =>
    {
        console.log('work done.');
        console.log(result);
    });

    work().then((result) =>
    {
        console.log('work done.');
        console.log(result);
    });
}
