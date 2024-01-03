<script>
// @ts-nocheck


	import UserStat from "./UserStat.svelte";

    /**
    * @type {import("../routes/user/+layout.server.js").User} user
    */
    export let user;

    let statKeys = Object.keys(user.stats);
</script>


<h1><p class="username">{user.userName}</p></h1>
<table>
    <tr>
        <div>
            <p class="tableTitle">
                Wins: {user.cockStats.wins}
            </p>
            <td><UserStat name={'lowest Today'} stat={user.cockStats.currentSize || "TBD"}/></td>
            <td><UserStat name={'lowest Size'} stat={user.cockStats.lowestSize || "TBD"}/></td>
            <td><UserStat name={'highest Size'} stat={user.cockStats.highestSize || "TBD"}/></td>
        </div>
    </tr>
    <tr>
        <div>
            <p class="tableTitle">
                Chat Stats
            </p>
            {#each statKeys as key}
                <td><UserStat name={key} stat={user.stats[key] || "TBD"}/></td>
            {/each}
        </div>
    </tr>
    
</table>



<style>
    p {
        color: whitesmoke
        
    }

    p.tableTitle {
        color: whitesmoke;
        line-height: 0.01;
        padding-bottom: unset;
        padding-top: unset;
        margin-bottom: 5px;
        text-align:center;
        font-family: 'Comic Sans MS',monospace;
    }

    p.username {
        text-align: center;
        font-family: 'Comic Sans MS',monospace;
    }

    

    table {
        color: whitesmoke;
        margin-left: auto;
        margin-right: auto;
    }

    tr {
        display: block;
    }

    td {
        
        width:100px;
        display: inline-block;
        padding-left: unset;
    }

    div {
            margin-left: auto;
            margin-right: auto;
            position: relative;
            margin-top: 5px;
            margin-bottom: 5px;
            display: table;
            /* outline-style: dotted; */
            outline-color: whitesmoke;
            width: 330px;
            border: 1px solid rgba(255, 255, 255, .25);
            border-radius: 20px;
            background-color: rgba(255, 255, 255, 0.15);
            box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.25);

            backdrop-filter: blur(15px);
        }
</style>



  