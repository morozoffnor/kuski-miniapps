<script>

import { botUser } from '../../stores/userStores.ts';

$: $botUser = $botUser
</script>


<!-- Responsive Container (recommended) -->
{#if $botUser.stats !== undefined}
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
			<tr>
				<th>Стата</th>
				<th>Значение</th>

			</tr>
			</thead>
			<tbody>
			<tr>
				<th colspan="2">Размеры</th>
			</tr>
			<tr>
				<td>Размер сегодня</td>
				<td>{$botUser.cockStats.currentSize || "TBD"}</td>
			</tr>
			<tr>
				<td>Минимальный</td>
				<td>{$botUser.cockStats.lowestSize || "TBD"}</td>
			</tr>
			<tr>
				<td>Максимальный</td>
				<td>{$botUser.cockStats.highestSize || "TBD"}</td>
			</tr>
			<tr>
				<th colspan="2">Чат</th>
			</tr>
			<tr>
				<td>Сообщения</td>
				<td>{$botUser.stats.messagesSent || "TBD"}</td>
			</tr>
			<tr>
				<td>Картинки</td>
				<td>{$botUser.stats.imagesSent || "TBD"}</td>
			</tr>
			<tr>
				<td>Видео</td>
				<td>{$botUser.stats.videosSent || "TBD"}</td>
			</tr>
			<tr>
				<td>Войсы</td>
				<td>{$botUser.stats.voicesSent || "TBD"}</td>
			</tr>
			<tr>
				<td>Кружки</td>
				<td>{$botUser.stats.circlesSent || "TBD"}</td>
			</tr>
			<tr>
				<td>Стикеры</td>
				<td>{$botUser.stats.stickersSent || "TBD"}</td>
			</tr>
			<tr>
				<td>Опросы</td>
				<td>{$botUser.stats.pollsSent || "TBD"}</td>
			</tr>
			<tr>
				<th colspan="2">Другое</th>
			</tr>
			<tr>
				<td>Предметов использовано</td>
				<td>{$botUser.stats.itemsUsed || "TBD"}</td>
			</tr>
			<tr>
				<td>Подрюкано бота</td>
				<td>{$botUser.stats.botUses || "TBD"}</td>
			</tr>
			<tr>
				<td>Якузда</td>
				<td>{$botUser.stats.yakuza || "TBD"}</td>
			</tr>
			</tbody>
			<tfoot>
			<!--		<tr>-->
			<!--			<th colspan="1">Calculated Total Weight</th>-->
			<!--			<td>Спасибо за внимание</td>-->
			<!--		</tr>-->
			</tfoot>
		</table>
	</div>
{/if}
