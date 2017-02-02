package com.getmicropad.NPXParser;

import org.simpleframework.xml.*;

import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import java.util.ArrayList;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Root(name="note")
public class Note {
	@Path("addons")
	@ElementList(inline=true, type=String.class, entry="import", name="addons", required = false)
	public List<String> addons = new ArrayList<>();

	@Path("bibliography")
	@ElementList(inline=true, type=Source.class, entry="source", name="bibliography", required = false)
	public List<Source> bibliography = new ArrayList<>();

	@ElementListUnion({
			@ElementList(inline=true, type=MarkdownElement.class, entry="markdown", required=false),
			@ElementList(inline=true, type=DrawingElement.class, entry="drawing", required=false),
			@ElementList(inline=true, type=ImageElement.class, entry="image", required=false),
			@ElementList(inline=true, type=FileElement.class, entry="file", required=false),
			@ElementList(inline=true, type=RecordingElement.class, entry="recording", required=false)
	})
	public List<NoteElement> elements = new ArrayList<>();

	@Attribute
	private String title;

	@Attribute(required = false)
	private XMLGregorianCalendar time;

	public Note() {
	}

	public Note(String title) {
		this.title = title;
		setTime(new Date());
	}

	public Note(String title, Date time) {
		this.title = title;
		setTime(time);
	}

	public String getTitle() {
		return this.title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public XMLGregorianCalendar getTime() {
		return this.time;
	}

	public void setTime(Date date) {
		GregorianCalendar calendar = new GregorianCalendar();
		calendar.setTime(date);
		try {
			DatatypeFactory datatypeFactory = DatatypeFactory.newInstance();
			this.time = datatypeFactory.newXMLGregorianCalendar(calendar);
		} catch (DatatypeConfigurationException e) {
			e.printStackTrace();
		}
	}

	public void setTime(XMLGregorianCalendar date) {
		this.time = date;
	}

	public List<String> getAddons() {
		return this.addons;
	}

	public void setAddons(List<String> addons) {
		this.addons = addons;
	}

	public Note search(String query) {
		query = query.replaceAll("/[\\-\\[\\]\\/\\{\\}\\(\\)\\*\\+\\?\\.\\\\\\^\\$\\|]/g", "\\$&");
		String regexStr = "\\b"+query;
		Pattern pattern = Pattern.compile(regexStr, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(this.getTitle());
		if (matcher.find()) return this;
		return null;
	}
}
