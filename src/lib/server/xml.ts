export function face(imageId: number) {
	return `<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.roblox.com/roblox.xsd" version="4">
	<External>null</External>
	<External>nil</External>
	<Item class="Decal" referent="RBX3">
		<Properties>
			<token name="Face">5</token>
			<string name="Name">face</string>
			<float name="Shiny">20</float>
			<float name="Specular">0</float>
			<Content name="Texture"><url>rbxassetid://${imageId}</url></Content>
			<float name="Transparency">0</float>
		</Properties>
	</Item>
</roblox>`;
}
