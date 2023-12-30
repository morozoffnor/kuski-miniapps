<script>
    /**
    * @type {import("../routes/user/+layout.server.js").User} user
    */
    export let user;
</script>


<p>{user.userid}</p>
<table>
    <tr>
        <td>id</td>
        <td>name</td>
        <td>age</td>
    </tr>
    <tr>
        <td>1</td>
        <td>zhangsan</td>
        <td>18</td>
    </tr>
    <tr>
        <td>2</td>
        <td>lisi</td>
        <td>20</td>
    </tr>
</table>



<style>
    p {
        color: whitesmoke
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
        border: 1px solid grey;
        width: 100px;
        display: inline-block;
    }
</style>



  